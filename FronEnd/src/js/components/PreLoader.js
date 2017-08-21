import React, {Component} from 'react';

class PreLoader extends Component {
    render() {
        return (
            <div className='padding-b-1'>
                <i className='fa fa-spinner fa-spin fa-lg'></i>
                <span>Идет загрузка...</span>
            </div>
        );
    }
}

export default PreLoader;