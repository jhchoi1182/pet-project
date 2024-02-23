import { todoApi } from "@/api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useTodoDelete(todoId: number, whenSuccess: "push" | "refetch") {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => todoApi.delete(todoId),
    onSuccess: () => {
      if (whenSuccess === "push") return router.push("/todo");
      else return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export default useTodoDelete;
