import React, {Component} from 'react';
import FiltratingInput from '../components/FiltratingInput';
import Pagination from './Pagination';
import ListPaginatorView from './ListPaginatorView';
import {take} from 'lodash/array'

class List extends Component {
    constructor (props) {
        super(props)

        this.state = {
            elements: props.elements,
            filters: props.filters,
            page: 0,
        }

        this.FilterElements = this.FilterElements.bind(this)
        this._getGroupElement = this._getGroupElement.bind(this)
        this._getPageCountElements = this._getPageCountElements.bind(this)
        this.ChangePage = this.ChangePage.bind(this)
    }

    componentWillReceiveProps(nextProps){
            this.setState({elements: nextProps.elements})
    }

    FilterElements(elements){
        this.setState({elements: elements, page: 0})
    }
    
    ChangePage(e){
        e.preventDefault()
        this.setState({page: +e.target.id})
    }

    _getPageCountElements(){
        const {pageCount} = this.props, {elements, page} = this.state, elementsCount = elements.length;

        return take(elements.slice(page*pageCount, elementsCount), pageCount);
    }

    _getGroupElement(size){
        const {elements} = this.state;
        let groupMas = [];
        
        for (let i=0,j=elements.length; i < j; i+=size) {
            groupMas.push(elements.slice(i,i+size));
        }

        return groupMas;
    }

    render() {
        const {filters, elements} = this.state;
        const {handlers, DynamicElementsView, pageCount} = this.props;
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <form className='form-inline'>
                        {filters.map((f, index) => {
                            return <FiltratingInput key={index} items={this.props.elements} field={f.name} placeholder={f.placeholder} prop={f.prop} onChange={this.FilterElements}/>
                        })}
                    </form>
                </div>
                <ul className='list-group'>
                    {this._getPageCountElements().map((e, i) => {
                        return <DynamicElementsView key={i} element={e} handlers={handlers} />
                    })}
                </ul>
                <div className='panel-footer'>
                    <div className='row'>
                        <div className='col-md-10'>
                            <Pagination items={this._getGroupElement(pageCount)} pickItem={this.ChangePage} DynamicPaginatorView={ListPaginatorView} />
                        </div>
                        <div className='col-md-2 text-right '> 
                            <i>Количество: {elements.length}</i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


List.propTypes = {
    elements: React.PropTypes.array.isRequired,
    filters: React.PropTypes.array.isRequired,
    DynamicElementsView: React.PropTypes.func.isRequired,
    pageCount: React.PropTypes.number.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default List;