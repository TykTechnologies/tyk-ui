import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MultiselectContext from './MultiselectContext';
import { Button } from '../../Button';
import { Collapsible } from '../../Collapsible';
import { Loader } from '../../Loader';

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
                    <div>
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
                          iconType={ context.opened[item.id] ? "chevron-up" : "chevron-down" }
                          iconOnly={ true }
                          onClick={ context.onGetItemDetails.bind(context.parentContext, item) }
                        />
                      </span>
                    </div>
                    {
                      item.details
                        ? <Collapsible
                            collapsed={ !context.opened[item.id] }
                            className="tyk-multiselect-item__details"
                          >
                            {
                              context.detailsDisplayTemplate
                                ? context.detailsDisplayTemplate(item)
                                : JSON.stringify(item.details)
                            }
                          </Collapsible>
                        : context.opened[item.id]
                            ? <Loader position="relative" />
                            : null
                    }
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
