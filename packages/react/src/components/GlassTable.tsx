'use client';

import React, { createContext, forwardRef, useContext } from 'react';
import { Glass } from '../primitives/Glass';
import { GlassDepth, GlassMaterial } from '../engine/types';
import { cn } from '../utils/cn';

interface TableContextValue {
  compact?: boolean;
  hoverable?: boolean;
  striped?: boolean;
}

const TableContext = createContext<TableContextValue>({
  compact: false,
  hoverable: true,
  striped: false,
});

/* =========================================================================
   GlassTable Root
   ========================================================================= */
export interface GlassTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  material?: GlassMaterial;
  depth?: GlassDepth;
  containerClassName?: string;
  striped?: boolean;
  compact?: boolean;
  hoverable?: boolean;
}

export const GlassTableRoot = forwardRef<HTMLTableElement, GlassTableProps>(
  (
    {
      material = 'crystal',
      depth = 1,
      containerClassName,
      striped = false,
      compact = false,
      hoverable = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TableContext.Provider value={{ compact, hoverable, striped }}>
        <Glass
          material={material}
          depth={depth}
          rounded="2xl"
          className={cn(
            'relative w-full overflow-hidden border border-white/10 shadow-xl shadow-black/20',
            containerClassName
          )}
        >
          <div className="relative w-full overflow-x-auto">
            <table
              ref={ref}
              className={cn('w-full caption-bottom text-sm text-left border-collapse', className)}
              {...props}
            >
              {children}
            </table>
          </div>
        </Glass>
      </TableContext.Provider>
    );
  }
);
GlassTableRoot.displayName = 'GlassTable';

/* =========================================================================
   GlassTable.Header (thead)
   ========================================================================= */
export interface GlassTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

export const GlassTableHeader = forwardRef<HTMLTableSectionElement, GlassTableHeaderProps>(
  ({ sticky = false, className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        'border-b border-white/10 bg-white/[0.04] backdrop-blur-md',
        sticky && 'sticky top-0 z-10',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  )
);
GlassTableHeader.displayName = 'GlassTable.Header';

/* =========================================================================
   GlassTable.Body (tbody)
   ========================================================================= */
export const GlassTableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-white/[0.06] [&_tr:last-child]:border-0', className)}
    {...props}
  >
    {children}
  </tbody>
));
GlassTableBody.displayName = 'GlassTable.Body';

/* =========================================================================
   GlassTable.Footer (tfoot)
   ========================================================================= */
export const GlassTableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-white/10 bg-white/[0.04] font-medium text-white/80 [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  >
    {children}
  </tfoot>
));
GlassTableFooter.displayName = 'GlassTable.Footer';

/* =========================================================================
   GlassTable.Row (tr)
   ========================================================================= */
export interface GlassTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const GlassTableRow = forwardRef<HTMLTableRowElement, GlassTableRowProps>(
  ({ selected, className, children, ...props }, ref) => {
    const { hoverable, striped } = useContext(TableContext);

    return (
      <tr
        ref={ref}
        aria-selected={selected}
        className={cn(
          'transition-colors duration-150',
          hoverable && 'hover:bg-white/[0.07]',
          striped && 'even:bg-white/[0.02]',
          selected && 'bg-blue-500/15 hover:bg-blue-500/20 text-white',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);
GlassTableRow.displayName = 'GlassTable.Row';

/* =========================================================================
   GlassTable.Head (th)
   ========================================================================= */
export const GlassTableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  const { compact } = useContext(TableContext);

  return (
    <th
      ref={ref}
      className={cn(
        'text-left align-middle font-semibold text-white/60 tracking-wider uppercase select-none',
        compact ? 'h-9 px-3 text-[11px]' : 'h-11 px-4 text-xs',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
});
GlassTableHead.displayName = 'GlassTable.Head';

/* =========================================================================
   GlassTable.Cell (td)
   ========================================================================= */
export const GlassTableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  const { compact } = useContext(TableContext);

  return (
    <td
      ref={ref}
      className={cn(
        'align-middle text-white/85 transition-colors',
        compact ? 'py-2 px-3 text-xs' : 'py-3.5 px-4 text-sm',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
});
GlassTableCell.displayName = 'GlassTable.Cell';

/* =========================================================================
   GlassTable.Caption (caption)
   ========================================================================= */
export const GlassTableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, children, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-3 text-xs text-white/50 text-center select-none', className)}
    {...props}
  >
    {children}
  </caption>
));
GlassTableCaption.displayName = 'GlassTable.Caption';

/* =========================================================================
   Compound Component Assembly
   ========================================================================= */
export const GlassTable = Object.assign(GlassTableRoot, {
  Header: GlassTableHeader,
  Body: GlassTableBody,
  Footer: GlassTableFooter,
  Row: GlassTableRow,
  Head: GlassTableHead,
  Cell: GlassTableCell,
  Caption: GlassTableCaption,
});
