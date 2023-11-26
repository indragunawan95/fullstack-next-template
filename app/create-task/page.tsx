"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createTodoSchema, CreateTodoSchemaType } from "@/schema/todoSchema"; // Import your schema definition here

export default function Page() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTodoSchemaType>({
        resolver: zodResolver(createTodoSchema),
    });

    const onSubmit: SubmitHandler<CreateTodoSchemaType> = async (data: CreateTodoSchemaType) => {
        try {
            const response = await fetch("/api/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">What needs to be done?</span>
            </label>
            <input
                type="text"
                placeholder="Enter a todo"
                className={`input input-bordered w-full max-w-xs ${
                    errors.text ? "input-error" : ""
                }`}
                {...register("text")} // This will register the input field with react-hook-form
            />
            {errors.text && (
                <span className="label-text-alt text-error">{errors.text.message}</span>
            )}
            <button type="submit" className="btn btn-primary mt-2">
                Add Todo
            </button>
        </form>
    );
}
