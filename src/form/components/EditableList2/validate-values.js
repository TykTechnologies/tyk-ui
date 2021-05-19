const validateValues = (fields, rowValues) => (rowValues || [[undefined, undefined]]).map(
  colValue => colValue?.map(
    (value, index) => fields?.[index]?.props?.validate
      && fields[index].props.validate(value),
  ),
);

export default validateValues;
