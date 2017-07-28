/**
 * Created by loki on 23.07.17.
 */
import React from 'react';
import Modal from 'react-modal';

import './Note.less';

const Note = React.createClass({
    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style} id={this.props.noteId}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> &#10007; </span>
                <span className='Note__update-icon' onClick={this.props.onUpdate}> &#9998; </span>
                <span className='Note__check-icon' onClick={this.props.onCheck}> &#10003; </span>
                {
                    this.props.title
                    ?
                        <h4 className='Note__title'>{this.props.title}</h4>
                    :
                        null
                }
                <div className='Note__text'>{this.props.children}</div>
            </div>
        );
    }
});

export default Note;