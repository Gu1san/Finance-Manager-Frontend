"use client";

const colors = [
  {
    name: "Olive Leaf",
    variable: "olive-leaf",
    variants: [
      { name: "Primary", className: "bg-olive-leaf" },
      { name: "Secondary", className: "bg-olive-leaf-secondary" },
      { name: "Hover", className: "bg-olive-leaf-hover" },
      { name: "Active", className: "bg-olive-leaf-active" },
    ],
  },
  {
    name: "Black Forest",
    variable: "black-forest",
    variants: [
      { name: "Primary", className: "bg-black-forest" },
      { name: "Secondary", className: "bg-black-forest-secondary" },
      { name: "Hover", className: "bg-black-forest-hover" },
      { name: "Active", className: "bg-black-forest-active" },
    ],
  },
  {
    name: "Cornsilk",
    variable: "cornsilk",
    variants: [
      { name: "Primary", className: "bg-cornsilk" },
      { name: "Secondary", className: "bg-cornsilk-secondary" },
      { name: "Hover", className: "bg-cornsilk-hover" },
      { name: "Active", className: "bg-cornsilk-active" },
    ],
  },
  {
    name: "Sunlit Clay",
    variable: "sunlit-clay",
    variants: [
      { name: "Primary", className: "bg-sunlit-clay" },
      { name: "Secondary", className: "bg-sunlit-clay-secondary" },
      { name: "Hover", className: "bg-sunlit-clay-hover" },
      { name: "Active", className: "bg-sunlit-clay-active" },
    ],
  },
  {
    name: "Copperwood",
    variable: "copperwood",
    variants: [
      { name: "Primary", className: "bg-copperwood" },
      { name: "Secondary", className: "bg-copperwood-secondary" },
      { name: "Hover", className: "bg-copperwood-hover" },
      { name: "Active", className: "bg-copperwood-active" },
    ],
  },
];

export default function ColorPalette() {
  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Color Palette</h1>

        <p className="mt-2 text-foreground-secondary">
          Semantic colors used throughout the application.
        </p>
      </div>

      <div className="space-y-10">
        {colors.map((color) => (
          <div key={color.variable}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {color.name}
              </h2>

              <p className="text-sm text-foreground-muted">
                --{color.variable}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {color.variants.map((variant) => (
                <div key={variant.name} className="space-y-2">
                  <div
                    className={`h-28 w-full rounded-xl border border-black/10 ${variant.className}`}
                  />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {variant.name}
                    </p>

                    <p className="text-xs text-foreground-muted">
                      {variant.className.replace("bg-", "--")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
