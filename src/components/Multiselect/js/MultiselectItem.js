import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MultiselectContext from './MultiselectContext';
import { Button } from '../../Button';

class MultiselectItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    searchValue: PropTypes.string,
    onChange: PropTypes.func
  };

  isInSearchValue(fieldsToSearchOn) {
    const { searchValue, item } = this.props;

    if(fieldsToSearchOn && fieldsToSearchOn.length > 0) {
      let fields = fieldsToSearchOn.slice(0);

      fields = fields.filter((key) => {
        return item[key] && item[key].search(searchValue) > -1;
      });

      return fields.length > 0;
    }

    return JSON.stringify(item).search(searchValue) > -1;
  }

  render() {
    const { searchValue, item, itemType, onChange } = this.props;

    return (
      <Fragment>
        <MultiselectContext.Consumer>
        {
          (context) => {
            return (
              this.isInSearchValue(context.fieldsToSearchOn)
                ? <li>
                    <span>
                      {
                        context.itemDisplayTemplate
                          ? context.itemDisplayTemplate(item)
                          : JSON.stringify(item)
                      }
                    </span>
                    <span className="tyk-multiselect-item__controls">
                      <Button
                        iconType={ itemType === 'normal' ? 'plus' : 'minus'}
                        iconOnly={ true }
                        onClick={ onChange.bind(null, item) }
                      />
                      <Button
                        iconType="chevron-down"
                        iconOnly={ true }
                      />
                    </span>
                  </li>
                : null
            );
          }
        }
        </MultiselectContext.Consumer>
      </Fragment>
    );
  }
}

export default MultiselectItem;
