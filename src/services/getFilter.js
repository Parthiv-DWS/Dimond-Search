export const GetFilterDetails = () => {
  return {
    query: `
      query GetDiamondFilter($variableName: Type) {
        diamondFilter(variableName: $variableName) {
          attribute_code
          count
          label
          min
          max
          options {
            label
            value
          }
        }
      }
    `,
  };
};
