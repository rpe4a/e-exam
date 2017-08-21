import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertsCollection from '../components/AlertsCollection';
import { getOrgClients, deleteOrgClient, rejectOrgClient } from '../actions/clientsActions';
import PreLoader from '../components/PreLoader';
import List from '../components/List';
import OrgClientView from '../components/OrgClientView';
import { addFlashMessage } from '../actions/flashMessageActions';
import { find } from 'lodash/collection';

class OrgClientsPage extends Component {
    constructor(props) {
        super(props)

        this._getOrgClientsView = this._getOrgClientsView.bind(this)
        this._deleteClient = this._deleteClient.bind(this)
        this._rejectUser = this._rejectUser.bind(this)
    }

    componentDidMount() {
        this.props.getOrgClients();
    }

    _rejectUser(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите отписать данного пользователя от вашей организации?')) {
            const {orgclients, rejectOrgClient, addFlashMessage} = this.props;
            const element = find(orgclients.clients, (c) => { return c.id == e.target.id })
            rejectOrgClient([{ id: element.id, dir: '' }]).then(() => {
                addFlashMessage({
                    type: 'success',
                    text: 'Экзаменуемый успешно отписан.'
                })
            }).catch(() => { });
        }
    }

    _deleteClient(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить экзаменуемого из вашей организации?')) {
            const {orgclients, deleteOrgClient, addFlashMessage} = this.props;
            const element = find(orgclients.clients, (c) => { return c.id == e.target.id })
            deleteOrgClient(element).then(() => {
                addFlashMessage({
                    type: 'success',
                    text: 'Экзаменуемый успешно удален.'
                })
            }).catch(() => { });
        }
    }

    _getOrgClientsView() {
        const {isFetching, clients} = this.props.orgclients;

        if (isFetching)
            return <PreLoader />
        if (clients.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали и/или добавляли экзаменуемых.']} styles='alert alert-warning' />

        return (
            <List elements={clients} pageCount={10} filters={[{ name: 'name', placeholder: 'Поиск по имени' }, { name: 'dirs', placeholder: 'Поиск по группе', prop: 'name' }]}
                DynamicElementsView={OrgClientView}
                handlers={{
                    deleteElement: this._deleteClient,
                    rejectElement: this._rejectUser,
                }}
                />
        )

    }

    render() {
        const alerts = [
            'Здесь представлены все Ваши экзаменуемые.',
            'Вы можете посмотреть результат прохождения того или иного экзамена у Вашего экзаменуемого или проверить его в ручную.',
            'Доступен фильтр по названиям групп. Экзаменуемые, которые не состоят ни в одной группе помечены бледно желтым.',
            'Вы так же можете назначать экзаменуемого на группы, просто шелкнув на его имя.',
        ]

        return (
            <div className='row margin-t-2'>
                <div className='col-md-12'>
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />

                </div>
                <div className='col-md-12'>
                    {this._getOrgClientsView()}
                </div>
            </div>
        );
    }
}

OrgClientsPage.propTypes = {
    orgclients: React.PropTypes.object.isRequired,
    getOrgClients: React.PropTypes.func.isRequired,
    deleteOrgClient: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        orgclients: state.orgclients,
    }
}

export default connect(mapStateToProps, { getOrgClients, deleteOrgClient, rejectOrgClient, addFlashMessage })(OrgClientsPage);
