import { createSelector } from "reselect";
describe("my reselect", () => {
  test("selectr", () => {
    let count = 0;
    const sel = createSelector(
      state => state.search,
      state => state.list,
      (search, list) => {
        count++;
        return list.filter(i => i.indexOf(search) !== -1);
      }
    );
    let s = {
      search: "boba",
      list: ["boba", "fet", "luke", "fluke"]
    };
    sel(s);

    s = { ...s, search: "fet" };
    sel(s);
    sel(s);
    sel(s);
    s = { ...s, search: "boba" };
    sel(s);
    sel(s);
    sel(s);
    expect(count).toEqual(3);
  });
});
