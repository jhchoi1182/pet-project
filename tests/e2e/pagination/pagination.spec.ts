import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.studysync.store/home");
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