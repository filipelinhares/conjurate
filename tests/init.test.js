const path = require("path");
const fs = require("fs");
const FileTest = require("fileshelf");
const { setup } = require("../src/init");
const { CONJURATE_CONFIG_JSON } = require("../src/content");

const root = "./tests/test-template";
const ft = new FileTest(root);

const FLAGS = {
  logs: false
};

beforeEach(() => {
  ft.reset(".conjurate.json");
  ft.reset("package.json");
});

afterAll(() => {
  ft.reset(".conjurate.json");
  ft.reset("package.json");
});

describe("init.js", () => {
  test("testing creation of .conjurate.json", async () => {
    const response = {
      confirm: true,
      place: ".conjurate.json"
    };

    await setup({ response, cwd: root, flags: FLAGS });

    expect(ft.includeFile(".conjurate.json")).toBe(true);
    expect(ft.readFile(".conjurate.json")).toBe(CONJURATE_CONFIG_JSON);
  });

  test("testing creation of package.json", async () => {
    const response = {
      confirm: true,
      place: "package.json"
    };

    await setup({ response, cwd: root, flags: FLAGS });
    const pkg = JSON.parse(ft.readFile("package.json"));

    expect(ft.includeFile("package.json")).toBe(true);
    expect(pkg).toHaveProperty("conjurate");
  });

  test("testing insertion in package.json", async () => {
    const response = {
      confirm: true,
      place: "package.json"
    };

    await fs.promises.writeFile(path.resolve(root, "package.json"), "");

    await setup({ response, cwd: root, flags: FLAGS });
    const pkg = JSON.parse(ft.readFile("package.json"));

    expect(ft.includeFile("package.json")).toBe(true);
    expect(pkg).toHaveProperty("conjurate");
  });
});
