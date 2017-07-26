import React from 'react';
import cx from 'classnames';

import './ColorPicker.less';

const COLORS = ['#FFFFFF', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#FFD180' ];

const ColorPicker = React.createClass({
    render() {
        return (
            <div className='ColorPicker'>
            	{
            		COLORS.map(color =>
            		    <div
                            key={color}
                            className={cx('ColorPicker__swatch', { selected: this.props.value === color })}
                            style={{ backgroundColor: color}}
                            onClick={this.props.onChange.bind(null, color)}
                        />
            		)
            	}
            </div>
        );
    }
});

export  default ColorPicker;