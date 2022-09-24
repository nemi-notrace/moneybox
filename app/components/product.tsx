import { Link, Form } from "@remix-run/react";
import type { product } from "@prisma/client";

export function ProductDisplay({
  product,
}: {
  product: Pick<product, "price" | "name">;
}) {
  return (
    <div>
      <p>Dein neues Ziel:</p>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <Link to=".">{product.name} Permalink</Link>

      <Form method="delete">
        <button type="submit" className="button">
          Löschen
        </button>
      </Form>
    </div>
  );
}
