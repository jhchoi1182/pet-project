import { renderHook, act } from "@testing-library/react";
import usePagination from "@/service/hooks/usePagination";
import AppProvider from "@/provider/AppProvider";
import { store } from "@/stores/store/store";

const pagination = (currentPage: number, totalPages: number) => {
  return renderHook(() => usePagination(currentPage, totalPages), { wrapper: AppProvider });
};

describe("usePagination 테스트", () => {
  it("초기 렌더링 시 현재 페이지가 1이어야 함", () => {
    const currentPage = store.getState().postSlice.currentPage;
    const { result } = pagination(currentPage, 100);
    expect(result.current.pages[0]).toEqual(1);
  });

  it("한 그룹에 최대 13페이지까지 나와야 함", () => {
    const { result } = pagination(1, 100);
    expect(result.current.pages).toEqual(Array.from({ length: 13 }, (_, i) => i + 1));
  });

  it("14페이지로 이동하면 현재 페이지가 14페이지여야 함", () => {
    const { result } = pagination(1, 100);
    act(() => result.current.movePage(14));
    const currentPage = store.getState().postSlice.currentPage;
    expect(currentPage).toEqual(14);
  });

  it("페이지 이동 시 세션 스토리지에 이동한 페이지가 저장되어야 함", () => {
    const { result } = pagination(1, 100);
    act(() => result.current.movePage(5));
    expect(window.sessionStorage.getItem("currentPage")).toBe("5");
  });

  it("그룹 이동 시 13페이지 단위로 넘어가야 함", () => {
    const { result } = pagination(16, 100);
    expect(result.current.pages).toEqual(Array.from({ length: 13 }, (_, i) => i + 14));
  });

  it("마지막 페이지 그룹이 전체 페이지 수를 초과하지 않아야 함", () => {
    const { result } = pagination(16, 20);
    expect(result.current.pages).toEqual(Array.from({ length: 7 }, (_, i) => i + 14));
  });

  it("totalPages가 0일 때 pages가 빈 배열이어야 함", () => {
    const { result } = pagination(1, 0);
    expect(result.current.pages).toEqual([]);
  });
});
