import React, {Component} from 'react'
import { Link } from 'react-router';
/*import classnames from 'classnames';*/
/*import ClientBase from '../components/ClientBase';*/
import DropDownLinks from '../components/DropDownLinks';
import {connect} from 'react-redux';
/*import {getClientBase, deleteDirectory, deleteClient, sendClientOnEmail, sendDirectoryOnEmail, printClientInFile, printDirectoryInFile} from '../actions/clientBaseActions';*/
import {addFlashMessage } from '../actions/flashMessageActions';
import {directoryTypes} from '../utils/constants';
import ClientBaseThing from '../components/ClientBaseThing';
import ClientBaseDirectoryView from '../components/ClientBaseDirectoryView';
import DirectoryView from '../components/DirectoryView';
import Base from '../components/Base';
import { bindActionCreators } from 'redux'
import BaseManager from '../actions/baseActions';
import PreLoader from '../components/PreLoader';
import AlertsCollection from '../components/AlertsCollection';
import Validation from '../validation/ClientBaseEmail';

const links =[
    {
        text: 'Одного',
        href: '/organization/clientbase/mergeclient/0'
    },
    {
        text: 'Несколько',
        href: '/organization/clientbase/createclients'
    },
]

class ClientBasePage extends Component {
    constructor(props) {
        super(props)

        this.getClientBaseView = this.getClientBaseView.bind(this)
        this.isCanCreateClient = this.isCanCreateClient.bind(this)
        this._SendOnEmail = this._SendOnEmail.bind(this)
        this.SendDirectoryOnEmail = this.SendDirectoryOnEmail.bind(this)
        this.SendClientOnEmail = this.SendClientOnEmail.bind(this)
        this.PrintDirectoryInFile = this.PrintDirectoryInFile.bind(this)
        this.PrintClientInFile = this.PrintClientInFile.bind(this)
    }

    componentDidMount() {
        this.props.getClientBase();
    }   

    isCanCreateClient() {
        return !(this.props.clientBase.directories.length > 0);
    }

    _getEmail() {
        return prompt('Введите email получателя:');
    }

    _isValidEmail(email) {
        const { errors, isValid } = Validation(email);

        if (!isValid) {
            this.props.addFlashMessage({
                type: 'danger',
                text: errors.email
            })
        }

        return isValid;
    }

    _PrintInFile(id, print){
        console.log(id);
        print({ id });
    }

    PrintDirectoryInFile(e){
        e.preventDefault();
        e.stopPropagation()
        this._PrintInFile(e.target.id, this.props.printDirectoryInFile, 'Логины с паролями данной директории успешно отправлены.')
    }

    PrintClientInFile(e){
        e.preventDefault();
        e.stopPropagation()
        this._PrintInFile(e.target.id, this.props.printClientInFile, 'Логины с паролями данной директории успешно отправлены.')
    }

    _SendOnEmail(id, send, message) {
        const email = this._getEmail();
        if (email && this._isValidEmail(email)) {
            send({ id, email }).then(() => {

                this.props.addFlashMessage({
                    type: 'success',
                    text: message
                })
            })
        }
    }

    SendDirectoryOnEmail(e) {
        e.preventDefault();
        e.stopPropagation()
        this._SendOnEmail(e.target.id, this.props.sendDirectoryOnEmail, 'Логины с паролями данной директории успешно отправлены.')
    }

    SendClientOnEmail(e) {
        e.preventDefault();
        e.stopPropagation()
        this._SendOnEmail(e.target.id, this.props.sendClientOnEmail, 'Логин с паролем успешно отправлен.')
    }

    getClientBaseView(){
        const {isFetching, directories} = this.props.clientBase;

        if (isFetching)
            return <PreLoader />
        if (directories.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали директорий и/или пользователей.']} styles='alert alert-warning' />

        const {clientBase, deleteClient, deleteClientDirectory, addFlashMessage} = this.props; 

        return (
                /*<ClientBase clientBase={clientBase}
                    deleteClient={deleteClient}
                    deleteDirectory={deleteClientDirectory}
                    addFlashMessage={addFlashMessage}
                    sendDirectoryOnEmail={sendDirectoryOnEmail}
                    sendClientOnEmail={sendClientOnEmail}
                    printClientInFile={printClientInFile}
                    printDirectoryInFile={printDirectoryInFile}
                />*/
                <Base base={{ directories: clientBase.directories, elements: clientBase.elements/*questionBase.questions*/ }}
                    handlers = {{ deleteThing: deleteClient,
                                  deleteDirectory: deleteClientDirectory,
                                  sendDirectoryOnEmail: this.SendDirectoryOnEmail, 
                                  sendClientOnEmail: this.SendClientOnEmail,
                                  printDirectoryInFile: this.PrintDirectoryInFile,
                                  printClientInFile: this.PrintClientInFile,
                               }}
                    DynamicThingComponent={ClientBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(ClientBaseDirectoryView)}
                    addFlashMessage={addFlashMessage}
                    />
            )
        
    }

    render () {
        return (
             <div>
                <h2>База экзаменуемых</h2>
                <p>
                    <i>
                        На данной странице представлена база экзаменуемых, которым в дальнейшем можно будет назначать экзамены.
                        Для более удобного манипулирования ими, Вы можете сгруппировать их по разным директориям с произвольным уровнем вложенности.
                        Добавив необходимых экзаменуемых, Вы можете перейти к их <Link to='/organization/exambase'><b>назначению на экзамены</b></Link>.
                    </i>
                </p>
                <div id='links ' className='margin-b-2'>
                    <Link to='/organization/clientbase/mergedirectory/0'
                        query={{ type: directoryTypes.client }}
                        className='btn btn-primary'>Создать директорию
                    </Link>
                    <DropDownLinks text='Создать экзаменуемого'
                                   links={links} 
                                   disabled={this.isCanCreateClient()}
                                   headerStyle='margin-l-1'
                                   buttonStyle='btn-primary'
                        /> 
                    <Link to='/organization/clientbase/myclients' className='btn btn-default margin-l-1'>Мои экзаменуемые</Link>    
                    <Link to='/organization/clientbase/userrequests' className='btn btn-default margin-l-1'>Заявки от пользователей</Link>
                </div>
                {this.getClientBaseView()}
            </div>
        )
    }
}

ClientBasePage.propTypes = {
    clientBase: React.PropTypes.object.isRequired,
    getClientBase: React.PropTypes.func.isRequired,
    deleteClient: React.PropTypes.func.isRequired,
    deleteClientDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    sendClientOnEmail: React.PropTypes.func.isRequired,
    sendDirectoryOnEmail: React.PropTypes.func.isRequired,
    printClientInFile: React.PropTypes.func.isRequired,
    printDirectoryInFile: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        clientBase: state.base,
    }
}

function mapDispatchToProps(dispatch) {
    const BaseActions = new BaseManager.Create(directoryTypes.client);
    return bindActionCreators({
         getClientBase: BaseActions.getBase,
         deleteClient: BaseActions.deleteThing,
         deleteClientDirectory: BaseActions.delDirectory,
         sendDirectoryOnEmail: BaseActions.sendDirectoryOnEmail,
         sendClientOnEmail: BaseActions.sendClientOnEmail,
         printClientInFile: BaseActions.printClientInFile,
         printDirectoryInFile: BaseActions.printDirectoryInFile,
         addFlashMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientBasePage);

/*export default connect(mapStateToProps, { getClientBase, deleteClient, deleteDirectory, addFlashMessage, sendDirectoryOnEmail, sendClientOnEmail, printClientInFile, printDirectoryInFile  })(ClientBasePage);*/