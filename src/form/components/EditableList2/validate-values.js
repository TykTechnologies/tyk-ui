const validateValues = (fields, rowValues = [[undefined, undefined]]) => rowValues.map(
  colValue => colValue?.map(
    (value, index) => fields?.[index]?.props?.validate
      && fields[index].props.validate(value),
  ),
);

export default validateValues;
