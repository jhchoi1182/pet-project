import { test, expect, type Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.studysync.store/home");
  // await page.goto("http://localhost:3000/home");
});

test.describe("페이지 이동 테스트", () => {
  test("첫 접속 시 '맨 처음/맨 끝 페이지로 이동 버튼', '이전/다음 페이지 버튼'이 하나씩만 있어야 함", async ({ page }) => {
    await expect(page.getByLabel("맨 처음/맨 끝 페이지로 이동 버튼")).toHaveCount(1);
    await expect(page.getByLabel("이전/다음 페이지 버튼")).toHaveCount(1);
  });

  test("페이지 이동 시 버튼이 두 개씩으로 늘어야함", async ({ page }) => {
    const page2Button = page.getByRole("button", { name: "2" });
    await page2Button.waitFor();
    await page2Button.click();
    await expect(page.getByLabel("맨 처음/맨 끝 페이지로 이동 버튼")).toHaveCount(2);
    await expect(page.getByLabel("이전/다음 페이지 버튼")).toHaveCount(2);
  });

  test("맨 마지막 페이지 이동 후 '맨 처음/맨 끝 페이지로 이동 버튼', '이전/다음 페이지 버튼'이 하나씩만 있어야 함", async ({ page }) => {
    const lastPageButton = page.getByLabel("맨 처음/맨 끝 페이지로 이동 버튼");
    await lastPageButton.waitFor();
    await lastPageButton.click();
    await expect(page.getByLabel("맨 처음/맨 끝 페이지로 이동 버튼")).toHaveCount(1);
    await expect(page.getByLabel("이전/다음 페이지 버튼")).toHaveCount(1);
  });

  test("페이지 이동하면 이동한 페이지 숫자가 굵어져야 함", async ({ page }) => {
    const page2Button = page.getByRole("button", { name: "2" });
    await page2Button.waitFor();

    await expect(page2Button).toHaveCSS("font-weight", "400");

    await page2Button.click();
    await expect(page2Button).toHaveCSS("font-weight", "700");
  });
});

test.describe("분류 탭 테스트", () => {
  let allButton: Locator, chatButton: Locator, recruitButton: Locator, informationButton: Locator, questionButton: Locator;

  test.beforeEach(async ({ page }) => {
    allButton = page.getByRole("button", { name: "전체" });
    chatButton = page.getByRole("button", { name: "잡담" });
    recruitButton = page.getByRole("button", { name: "모집" });
    informationButton = page.getByRole("button", { name: "정보" });
    questionButton = page.getByRole("button", { name: "질문" });
  });

  test("첫 접속 시 분류 탭에서 '전체'가 활성화되어 있어야 함", async () => {
    await expect(allButton).toHaveCSS("font-weight", "600");
    await expect(chatButton).toHaveCSS("font-weight", "400");
    await expect(recruitButton).toHaveCSS("font-weight", "400");
    await expect(informationButton).toHaveCSS("font-weight", "400");
    await expect(questionButton).toHaveCSS("font-weight", "400");
  });

  test("분류 탭의 항목을 클릭하면 해당 항목이 활성화되어야 함", async () => {
    await expect(allButton).toHaveCSS("font-weight", "600");
    await chatButton.click();

    await expect(allButton).toHaveCSS("font-weight", "400");
    await expect(chatButton).toHaveCSS("font-weight", "600");
    await recruitButton.click();

    await expect(chatButton).toHaveCSS("font-weight", "400");
    await expect(recruitButton).toHaveCSS("font-weight", "600");
    await informationButton.click();

    await expect(recruitButton).toHaveCSS("font-weight", "400");
    await expect(informationButton).toHaveCSS("font-weight", "600");
    await questionButton.click();

    await expect(informationButton).toHaveCSS("font-weight", "400");
    await expect(questionButton).toHaveCSS("font-weight", "600");
  });

  test("분류 탭 클릭 시 실제 검색 결과에 해당 분류만 나와야 함", async ({ page }) => {
    await chatButton.click();
    await page.waitForSelector('[data-testid="category"]', { state: "attached" });
    await expect(page.getByTestId("category").filter({ hasNotText: "잡담" })).toHaveCount(0);

    await recruitButton.click();
    await page.waitForSelector('[data-testid="category"]', { state: "attached" });
    await expect(page.getByTestId("category").filter({ hasNotText: "모집" })).toHaveCount(0);

    await informationButton.click();
    await page.waitForSelector('[data-testid="category"]', { state: "attached" });
    await expect(page.getByTestId("category").filter({ hasNotText: "정보" })).toHaveCount(0);

    await questionButton.click();
    await page.waitForSelector('[data-testid="category"]', { state: "attached" });
    await expect(page.getByTestId("category").filter({ hasNotText: "질문" })).toHaveCount(0);
  });
});

test.describe("검색 테스트", () => {
  let selectedSearchType: Locator, dropdownArrow: Locator;

  test.beforeEach(async ({ page }) => {
    selectedSearchType = page.getByTestId("selectedSearchType");
    dropdownArrow = page.getByLabel("검색 분류 열기");
  });
  test("검색 타입 바꾸면 셀렉터가 잘 바뀌는지 테스트", async ({ page }) => {
    await expect(selectedSearchType).toHaveText("제목+내용");

    await dropdownArrow.click();
    await page.getByRole("button", { name: "제목", exact: true }).click();
    await expect(selectedSearchType).toHaveText("제목");

    await dropdownArrow.click();
    await page.getByRole("button", { name: "내용", exact: true }).click();
    await expect(selectedSearchType).toHaveText("내용");

    await dropdownArrow.click();
    await page.getByRole("button", { name: "작성자", exact: true }).click();
    await expect(selectedSearchType).toHaveText("작성자");

    await dropdownArrow.click();
    await page.getByRole("button", { name: "제목+내용", exact: true }).click();
    await expect(selectedSearchType).toHaveText("제목+내용");
  });

  test("제목 검색하면 검색어에 해당되는 결과물만 렌더링되어야 함", async ({ page }) => {
    await dropdownArrow.click();
    await page.getByRole("button", { name: "제목", exact: true }).click();
    await page.fill("#search", "안녕");

    const searchValue = await page.inputValue("#search");
    console.log(`입력된 검색어: ${searchValue}`);

    await page.press("#search", "Enter");

    await page.waitForSelector('[data-testid="title"]', { state: "attached" });
    const resultCount = await page.getByTestId("title").count();
    await expect(resultCount).toBeGreaterThan(0);
    await expect(page.getByTestId("title").filter({ hasNotText: "안녕" })).toHaveCount(0);
  });

  test("작성자 검색하면 검색어에 해당되는 결과물만 렌더링되어야 함", async ({ page }) => {
    await dropdownArrow.click();
    await page.getByRole("button", { name: "작성자", exact: true }).click();
    await page.fill("#search", "yhhnnmm");
    await page.press("#search", "Enter");

    await page.waitForSelector('[data-testid="nickname"]', { state: "attached" });
    const resultCount = await page.getByTestId("nickname").count();
    await expect(resultCount).toBeGreaterThan(0);
    await expect(page.getByTestId("nickname").filter({ hasNotText: "yhhnnmm" })).toHaveCount(0);
  });

  test("검색 결과에 하이라이트되어야 함", async ({ page }) => {
    await dropdownArrow.click();
    await page.getByRole("button", { name: "제목+내용", exact: true }).click();
    await page.fill("#search", "안녕");
    await page.press("#search", "Enter");

    const highlightSpan = page.getByTestId("highlight_span");

    await page.waitForSelector('[data-testid="highlight_span"]', { state: "attached" });
    const resultCount = await highlightSpan.count();
    await expect(resultCount).toBeGreaterThan(0);
    await expect(highlightSpan.filter({ hasNotText: "안녕" })).toHaveCount(0);

    for (let i = 0; i < resultCount; ++i) await expect(highlightSpan.nth(i)).toHaveCSS("background-color", "rgb(251, 197, 49)");
  });
});
