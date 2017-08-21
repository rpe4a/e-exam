import React, {Component} from 'react'
import Base from './Base';
import ClientBaseThing from './ClientBaseThing';
import ClientBaseDirectoryView from './ClientBaseDirectoryView';
import Validation from '../validation/ClientBaseEmail';

class ClientBase extends Component {
    constructor(props) {
        super(props)

        this.DeleteClient = this.DeleteClient.bind(this)
        this.DeleteDirectory = this.DeleteDirectory.bind(this)
        this._SendOnEmail = this._SendOnEmail.bind(this)
        this.SendDirectoryOnEmail = this.SendDirectoryOnEmail.bind(this)
        this.SendClientOnEmail = this.SendClientOnEmail.bind(this)
        this.PrintDirectoryInFile = this.PrintDirectoryInFile.bind(this)
        this.PrintClientInFile = this.PrintClientInFile.bind(this)
    }

    DeleteDirectory(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить директорию и все ее содержимое?')) {
            this.props.deleteDirectory(e.target.id).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Директория успешно удалена.'
                })
            });
        }
    }

    DeleteClient(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить пользователя?')) {
            this.props.deleteClient(e.target.id).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Пользователь успешно удален.'
                })
            });
        }
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
        this._SendOnEmail(e.target.id, this.props.sendClientOnEmail, 'Логины с паролем успешно отправлен.')
    }

    render() {
        const {clientBase} = this.props;

        return (
            <div>
                <Base base={{ directories: clientBase.directories, elements: clientBase.clients }}
                    handlers = {{ deleteThing: this.DeleteClient, 
                                  deleteDirectory: this.DeleteDirectory, 
                                  sendDirectoryOnEmail: this.SendDirectoryOnEmail, 
                                  sendClientOnEmail: this.SendClientOnEmail,
                                  printDirectoryInFile: this.PrintDirectoryInFile,
                                  printClientInFile: this.PrintClientInFile,

                               }}
                    DynamicThingComponent={ClientBaseThing}
                    DynamicDirectoryViewComponent={ClientBaseDirectoryView}
                    />
            </div>
        )
    }
}

ClientBase.propTypes = {
    clientBase: React.PropTypes.object.isRequired,
    deleteClient: React.PropTypes.func.isRequired,
    deleteDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    sendDirectoryOnEmail: React.PropTypes.func.isRequired,
    sendClientOnEmail: React.PropTypes.func.isRequired,
    printDirectoryInFile: React.PropTypes.func.isRequired,
    printClientInFile: React.PropTypes.func.isRequired,
}

export default ClientBase