import React, {Component} from 'react'
import Directory from './Directory';
import arrayToTree  from 'array-to-tree';
import {filter} from 'lodash/collection';
import {cloneDeep} from 'lodash/lang';
import {find} from 'lodash/collection';

class Base extends Component {
    constructor(props) {
        super(props);
        
        this.DeleteDirectory = this.DeleteDirectory.bind(this)
        this.DeleteThing = this.DeleteThing.bind(this)
    }

    DeleteDirectory(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить директорию и все ее содержимое?')) {
            const {base, handlers} = this.props;
            const directory = find(base.directories, (d) => { return d.id == e.target.id })
            handlers.deleteDirectory(directory)
                .then(() => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Директория успешно удалена.'
                    })
                }).catch(() => { });
        }
    }

    DeleteThing(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить элемент?')) {
            const {base, handlers} = this.props;
            const element = find(base.elements, (el) => { return el.id == e.target.id && el.dir == e.target.getAttribute('data-dir')})
            handlers.deleteThing(element).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Элемент успешно удален.'
                })
            }).catch(() => { });
        }
    }

    render() {

        const {base, handlers, DynamicDirectoryViewComponent, DynamicThingComponent, changeDirectoryThing} = this.props;

        let dirs = cloneDeep(base.directories);

        dirs.forEach((d) => {
            d.things = [];
            if (base.elements.length > 0) {
                d.things.push(...filter(base.elements, function (e) {
                    changeDirectoryThing && changeDirectoryThing(e);
                    return e.dir == d.id;
                }))
            }
        })

        let tree = arrayToTree(dirs, {
            parentProperty: 'parentId',
            customID: 'id'
        })

        return (
            <div>
                {
                    tree.map((d) => {
                        return <Directory key={d.id}
                            node={d}
                            DynamicThingComponent={DynamicThingComponent}
                            DynamicDirectoryViewComponent={DynamicDirectoryViewComponent}
                            /*handlers={handlers}*/
                            handlers={{...handlers, deleteThing: this.DeleteThing, deleteDirectory: this.DeleteDirectory }} />
                    })
                }
            </div>
        )
    }
}

Base.propTypes = {
    base: React.PropTypes.object.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
    changeDirectoryThing: React.PropTypes.func,
    DynamicThingComponent: React.PropTypes.func.isRequired,
    DynamicDirectoryViewComponent: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func,
};

export default Base