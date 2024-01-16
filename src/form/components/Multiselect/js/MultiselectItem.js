import React, { useCallback } from 'react';
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

function MultiselectItem({
  item,
  itemType,
  searchValue,
  onChange,
}) {
  const isInSearchValue = useCallback((fieldsToSearchOn) => {
    if (fieldsToSearchOn?.length > 0) {
      return fieldsToSearchOn.some((key) => item[key] && item[key].includes(searchValue));
    }

    return JSON.stringify(item).includes(searchValue);
  }, [item, searchValue]);

  const onAddRemove = useCallback(() => {
    onChange(item);
  }, [onChange, item]);

  return (
    <MultiselectContext.Consumer>
      {
        (context) => (
          isInSearchValue(context.fieldsToSearchOn)
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
                      onClick={onAddRemove}
                      disabled={context.disabled || (context.maxSelections && context.maxSelections === context.nrSelectedItems && itemType === 'normal')}
                    />
                    <Button
                      iconType={context.opened[item.id] ? 'chevron-up' : 'chevron-down'}
                      iconOnly
                      onClick={() => context.onGetItemDetails(item)}
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
  );
}

MultiselectItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  itemType: PropTypes.string,
  searchValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default MultiselectItem;
