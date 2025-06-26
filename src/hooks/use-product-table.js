import { parseAsString, useQueryStates } from "nuqs";

const useProductTableFilter = () => {
  return useQueryStates({
    keyword: parseAsString,
  });
};

export default useProductTableFilter;
