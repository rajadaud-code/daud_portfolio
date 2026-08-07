import type { ComponentType } from "react";
import { ArrowRight, Bot, Cpu, Database, HardDrive, Layers, Layout, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArchitectureNode } from "@/types";

export interface ArchitectureDiagramProps {
  title?: string;
  nodes?: ArchitectureNode[];
  className?: string;
}

const nodeIcons: Record<ArchitectureNode["type"], ComponentType<LucideProps>> = {
  client: Layout,
  api: Cpu,
  ai: Bot,
  db: Database,
  queue: Layers,
  cache: HardDrive,
};

const nodeColors: Record<ArchitectureNode["type"], string> = {
  client: "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
  api: "bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200",
  ai: "bg-purple-50/60 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200",
  db: "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200",
  queue: "bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200",
  cache: "bg-cyan-50/60 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200",
};

/**
 * ArchitectureDiagram — visual node-and-connector system flow visualizer.
 *
 * Renders technical system architecture cleanly using semantic tokens,
 * custom SVG connectors, and responsive grid layouts.
 */
export function ArchitectureDiagram({
  title = "System Architecture",
  nodes = [],
  className,
}: ArchitectureDiagramProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface p-6 md:p-8",
        className,
      )}
    >
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <h4 className="font-mono text-label uppercase text-ink-subtle">
          {title}
        </h4>
        <span className="font-mono text-xs text-ink-subtle">
          High-Level Flow
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node, index) => {
          const Icon = nodeIcons[node.type] || Cpu;
          const isLast = index === nodes.length - 1;

          return (
            <div key={node.id} className="relative flex flex-col justify-between">
              <div
                className={cn(
                  "flex flex-col gap-3 rounded-control border p-5 transition-transform duration-300 hover:-translate-y-1",
                  nodeColors[node.type],
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-md bg-canvas/80 shadow-hairline">
                    <Icon className="size-4 text-ink" />
                  </span>
                  <span className="font-mono text-xs opacity-70">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <p className="font-medium text-sm leading-snug">{node.label}</p>
                  {node.sublabel ? (
                    <p className="mt-1 font-mono text-xs opacity-75">
                      {node.sublabel}
                    </p>
                  ) : null}
                </div>
              </div>

              {!isLast ? (
                <div className="my-2 flex items-center justify-center text-ink-subtle lg:absolute lg:-right-3 lg:top-1/2 lg:my-0 lg:-translate-y-1/2 lg:translate-x-1/2 lg:z-10">
                  <ArrowRight aria-hidden="true" className="size-4 max-lg:rotate-90" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
