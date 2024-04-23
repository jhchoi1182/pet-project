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
