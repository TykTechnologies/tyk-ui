import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MultiselectContext from './MultiselectContext';
import Button from '../../../../components/Button';
import Collapsible from '../../../../components/Collapsible';
import Loader from '../../../../components/Loader';

const getItemContent = (context, item) => (
  context.detailsDisplayTemplate
    ? context.detailsDisplayTemplate(item)
    : JSON.stringify(item.details)
);

const getItemLoader = (context, item) => {
  const { opened } = context;

  return opened[item.id]
    ? <Loader position="relative" />
    : null;
};

class MultiselectItem extends Component {
  static propTypes = {
    item: PropTypes.instanceOf(Object),
    itemType: PropTypes.string,
    searchValue: PropTypes.string,
    onChange: PropTypes.func,
  };

  isInSearchValue(fieldsToSearchOn) {
    const { searchValue, item } = this.props;

    if (fieldsToSearchOn && fieldsToSearchOn.length > 0) {
      let fields = fieldsToSearchOn.slice(0);

      fields = fields.filter(key => item[key] && item[key].search(searchValue) > -1);

      return fields.length > 0;
    }

    return JSON.stringify(item).search(searchValue) > -1;
  }

  render() {
    const {
      item,
      itemType,
      onChange,
    } = this.props;

    return (
      <Fragment>
        <MultiselectContext.Consumer>
          {
            context => (
              this.isInSearchValue(context.fieldsToSearchOn)
                ? (
                  <li>
                    <div>
                      <span className="tyk-multiselect-item__name">
                        {
                          context.itemDisplayTemplate
                            ? context.itemDisplayTemplate(item)
                            : JSON.stringify(item)
                        }
                      </span>
                      <span className="tyk-multiselect-item__controls">
                        <Button
                          iconType={itemType === 'normal' ? 'plus' : 'minus'}
                          iconOnly
                          // eslint-disable-next-line react/jsx-no-bind
                          onClick={onChange.bind(null, item)}
                          disabled={context.disabled || (context.maxSelections && context.maxSelections === context.nrSelectedItems && itemType === 'normal')}
                        />
                        <Button
                          iconType={context.opened[item.id] ? 'chevron-up' : 'chevron-down'}
                          iconOnly
                          // eslint-disable-next-line react/jsx-no-bind
                          onClick={context.onGetItemDetails.bind(context.parentContext, item)}
                        />
                      </span>
                    </div>
                    {
                      item.details
                        ? (
                          <Collapsible
                            collapsed={!context.opened[item.id]}
                            className="tyk-multiselect-item__details"
                          >
                            {getItemContent(context, item)}
                          </Collapsible>
                        )
                        : getItemLoader(context, item)
                    }
                  </li>
                )
                : null
            )
          }
        </MultiselectContext.Consumer>
      </Fragment>
    );
  }
}

export default MultiselectItem;
