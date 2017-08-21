import {subscriptionStatus} from '../utils/constants';

class Subscription {
    GetConfirmMessage() {
        return 'Вы точно хотите отписаться от данной организации?';
    }

    GetSuccessMessage() {
        return 'Заявка успешно удалена.';
    }
}

class AcceptedSubscription extends Subscription {

    GetSuccessMessage() {
        return 'Вы успешно отписались.';
    }
}
class ProcessingSubscription extends Subscription {

    GetConfirmMessage() {
        return 'Вы точно хотите удалить еще не обработанную заявку?';
    }

}
class RejectedSubscription extends Subscription {

}

class SubscriptionManager {
    static Create(type) {
        switch (+type) {
            case subscriptionStatus.accepted:
                return new AcceptedSubscription();
            case subscriptionStatus.processing:
                return new ProcessingSubscription();
            case subscriptionStatus.rejected:
                return new RejectedSubscription();
            default:
                throw new Error(`SubscriptionManager - founded wrong type of status @:${type}`)
        }
    }
}

export default SubscriptionManager;