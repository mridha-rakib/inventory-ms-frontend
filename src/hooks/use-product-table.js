import { parseAsString, useQueryStates } from "nuqs";

const useProductTableFilter = () => {
  return useQueryStates({
    keyword: parseAsString.withDefault(""),
  });
};

export default useProductTableFilter;
