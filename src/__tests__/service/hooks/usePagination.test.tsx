import Home from "@/app/home/page";
import AppProvider from "@/provider/AppProvider";
import { render, screen } from "@testing-library/react";

test("간단한 테스트", async () => {
  render(<Home />, { wrapper: AppProvider });

  expect(await screen.findByText("쉼터")).toBeInTheDocument();
});
