import { InputHTMLAttributes } from "react";

export default function InputField(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return <input className="border px-4" {...props} />;
}
