import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { WoopsaValue } from './woopsaValue';
import { WoopsaClient } from './woopsaClient';

export class WoopsaSubscription {

    constructor(path: string, monitorInterval: number, publishInterval: number) {
        this.path = path;
        this.monitorInterval = monitorInterval;
        this.publishInterval = publishInterval;
    }

    readonly path: string;
    readonly monitorInterval: number;
    readonly publishInterval: number;

    id: number;
    subject: Subject<WoopsaValue> = new Subject<WoopsaValue>();
    changes: Observable<WoopsaValue> = this.subject.asObservable();
}

export class WoopsaSubscriptionChannel {
    private readonly subscriptionCreate: string = 'SubscriptionService/CreateSubscriptionChannel';
    private readonly subscriptionRegister: string = 'SubscriptionService/RegisterSubscription';
    private readonly subscriptionUnregister: string = 'SubscriptionService/UnregisterSubscription';
    private readonly subscriptionWait: string = 'SubscriptionService/WaitNotification';

    private waitRunning: boolean;

    private lastNotificationId: number;
    private subscriptions: Map<string, WoopsaSubscription>;
    private channelCreationPromise: Promise<number>;

    ChannelId: number;

    constructor(private _client: WoopsaClient,
        private _size: number) {
        this.reset();
    }

    create(): Promise<number> {
        if (!this.channelCreationPromise) {
            // TODO : improve woopsa value to parse all supported types.
            this.channelCreationPromise = this._client.invoke(this.subscriptionCreate, {NotificationQueueSize: this._size})
                .then(channelId => this.ChannelId = +channelId.asText);
        }
        return this.channelCreationPromise;
    }

    reset() {
        this.channelCreationPromise = undefined;
        this.lastNotificationId = 0;
        this.subscriptions = new Map<string, WoopsaSubscription>();
        this.waitRunning = false;
    }

    register(subscription: WoopsaSubscription): Promise<WoopsaSubscription> {
        let args = {
            SubscriptionChannel: this.ChannelId,
            PropertyLink: subscription.path,
            MonitorInterval: subscription.monitorInterval,
            PublishInterval: subscription.publishInterval
        };
        return this._client.invoke(this.subscriptionRegister, args)
            .then(subscriptionId => {
                subscription.id = +subscriptionId.asText;
                this.subscriptions.set(`${subscription.id}`, subscription);
                this.tryWait();
                return subscription;
            });
    }

    unregister(subscription: WoopsaSubscription): Promise<void> {
        if (this.subscriptions.has(`${subscription.id}`)) {

            let args = {
                SubscriptionChannel: this.ChannelId,
                SubscriptionId: subscription.id
            };
            return this._client.invoke(this.subscriptionUnregister, args)
                .then(success => {
                    if (success.asText == 'true') {
                        this.subscriptions.delete(`${subscription.id}`);
                    }
                });
        } else {
            return Promise.resolve();
        }
    }

    unregisterOffline(subscription: WoopsaSubscription) {
        if (this.subscriptions.has(`${subscription.id}`)) {
            this.subscriptions.delete(`${subscription.id}`);
        }
    }

    private tryWait() {
        if (!this.waitRunning) {
            this.waitRunning = true;
            this.wait();
        }
        else
            return;
    }

    private wait() {
        let args = {
            SubscriptionChannel: this.ChannelId,
            LastNotificationId: this.lastNotificationId
        };
        this._client.invoke(this.subscriptionWait, args)
            .then(result => {
                let notifications = <any>result.asText;

                console.log(`[${this.ChannelId}] Received notifications : ${notifications}`);

                for (let n of notifications) {
                    if (this.subscriptions.has(`${n.SubscriptionId}`)) {
                        this.subscriptions.get(`${n.SubscriptionId}`).subject.next(WoopsaClient.mapValue(n.Value));
                        console.log('Sent notification : ' + n.Value);
                        if (n.Id > this.lastNotificationId)
                            this.lastNotificationId = n.Id;
                    }
                }

                if (this.subscriptions.size > 0) {
                    // TODO: check if disposing is required.
                    this.wait();
                } else {
                    this.waitRunning = false;
                }    
            }).catch(error => {
                console.log('Subscription error');
            });

    }
}