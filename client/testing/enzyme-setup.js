// NOTE: We'll need to add the following lines to the "jest" config in the
// eda-frontend-deps package.json:
// "setupFiles": [
//   "./testing/enzyme-setup.js"
// ]
// So I'm just configuring enzyme in each test file for now :)

import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({
  adapter: new Adapter(),
});
