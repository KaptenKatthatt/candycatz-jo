import { vi, test, expect, beforeEach } from "vitest";

vi.resetModules();

const renderAllCardsMock = vi.fn();
const renderNavbarMock = vi.fn();
const initStoreMock = vi.fn();
const renderOffCanMock = vi.fn();

vi.mock("../../src/components/renderAllCards", () => ({
  renderAllCards: renderAllCardsMock,
}));
vi.mock("../../src/components/navbar", () => ({
  renderNavbar: renderNavbarMock,
}));
vi.mock("../../src/components/cart", () => ({ initStore: initStoreMock }));
vi.mock("../../src/components/offcan", () => ({
  renderOffCan: renderOffCanMock,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

test("does not auto-start app during tests", async () => {
  const main = await import("../../src/main");
  expect(main.startApp).toBeTypeOf("function");
  expect(renderAllCardsMock).not.toHaveBeenCalled();
  expect(renderNavbarMock).not.toHaveBeenCalled();
  expect(initStoreMock).not.toHaveBeenCalled();
});

test("startApp triggers initialization functions", async () => {
  const main = await import("../../src/main");
  await main.startApp();
  expect(renderAllCardsMock).toHaveBeenCalled();
  expect(renderNavbarMock).toHaveBeenCalled();
  expect(initStoreMock).toHaveBeenCalled();
});
