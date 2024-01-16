import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import MultiselectPanel from './js/MultiselectPanel';
import MultiselectContext from './js/MultiselectContext';

const diffObjects = (value, items) => items.filter((item) => !value.find((v) => v.id === item.id));

function Multiselect({
  customSearch,
  entityNamePlural,
  disabled,
  error,
  getItemDetails,
  itemDisplayTemplate,
  detailsDisplayTemplate,
  fieldsToSearchOn,
  items,
  itemsPageNumber,
  itemsNrPages,
  loadMoreItems,
  maxSelections,
  note,
  value,
  onChange,
  wrapperClassName = '',
}) {
  const [opened, setOpened] = useState({});

  const onGetItemDetails = useCallback((item) => {
    setOpened((prevOpened) => ({ ...prevOpened, [item.id]: !prevOpened[item.id] }));

    if (getItemDetails) getItemDetails(item);
  }, [getItemDetails]);

  function getMultiselectError() {
    return (error && error !== 'true' && error !== 'false')
      ? (
        <p className="tyk-form-control__error-message">
          { error }
        </p>
      )
      : null;
  }

  const getCssClasses = useCallback(
    () => [
      wrapperClassName,
      'tyk-multiselect',
      error && 'has-error',
    ]
      .filter(Boolean)
      .join(' '),
    [wrapperClassName, error],
  );

  const itemsChange = useCallback((allItems, item) => {
    const valueClone = structuredClone(value);

    valueClone.unshift(item);

    onChange(valueClone, item, 'added');
  }, [value]);

  const valueChange = useCallback((newValue, item) => {
    onChange(newValue, item, 'removed');
  }, [items]);

  const providerValue = useMemo(() => ({
    disabled,
    itemDisplayTemplate,
    detailsDisplayTemplate,
    fieldsToSearchOn,
    maxSelections,
    nrSelectedItems: value.length,
    onGetItemDetails,
    opened,
  }), [
    disabled,
    itemDisplayTemplate,
    detailsDisplayTemplate,
    fieldsToSearchOn,
    maxSelections,
    value,
    onGetItemDetails,
    opened,
  ]);

  return (
    <>
      <div className={getCssClasses()}>
        <MultiselectContext.Provider value={providerValue}>
          <div className="tyk-multiselect__header">
            <div>
              { value.length }
              {' '}
              Selected
              {' '}
              { entityNamePlural }
            </div>
            <div>
              Select from existing
              { entityNamePlural }
            </div>
          </div>
          <div className="tyk-multiselect__panel-wrapper">
            <MultiselectPanel
              inputPlaceholder={`Search through selected ${entityNamePlural}`}
              noItemsMessage={`Selected ${entityNamePlural} will show here`}
              items={value}
              onChange={valueChange}
              panelType="selected"
            />
            <MultiselectPanel
              inputPlaceholder={`Search existing ${entityNamePlural}`}
              noItemsMessage={`No ${entityNamePlural} to display`}
              entityNamePlural={entityNamePlural}
              customSearch={!!customSearch}
              onCustomSearch={customSearch}
              items={diffObjects(value, items)}
              onChange={itemsChange}
              serverLoad={!!loadMoreItems}
              loadMoreItems={loadMoreItems}
              itemsPageNumber={itemsPageNumber}
              itemsNrPages={itemsNrPages}
              panelType="normal"
            />
          </div>
        </MultiselectContext.Provider>
      </div>
      <div>
        {
          note
            ? <p className="tyk-form-control__help-block">{ note }</p>
            : null
        }
      </div>
      { getMultiselectError() }
    </>
  );
}

Multiselect.propTypes = {
  customSearch: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  entityNamePlural: PropTypes.string,
  items: PropTypes.instanceOf(Array),
  itemDisplayTemplate: PropTypes.func,
  detailsDisplayTemplate: PropTypes.func,
  fieldsToSearchOn: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  getItemDetails: PropTypes.func,
  itemsPageNumber: PropTypes.number,
  itemsNrPages: PropTypes.number,
  loadMoreItems: PropTypes.func,
  note: PropTypes.string,
  maxSelections: PropTypes.number,
  value: PropTypes.instanceOf(Array),
  wrapperClassName: PropTypes.string,
};

export default Multiselect;
