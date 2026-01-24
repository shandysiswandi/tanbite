import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libraries/utils/tailwind";

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  id: string;
  className?: string;
  emptyMessage?: string;
  name?: string;
  onValueChange: (value: string[]) => void;
  options: readonly MultiSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  value: string[];
}

export function MultiSelect({
  id,
  className,
  emptyMessage = "No options found.",
  name,
  onValueChange,
  options,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  value,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    if (value.length === 0) {
      return placeholder;
    }

    const labels = options
      .filter((option) => value.includes(option.value))
      .map((option) => option.label);

    if (labels.length <= 2) {
      return labels.join(", ");
    }

    return `${labels.slice(0, 2).join(", ")} +${labels.length - 2}`;
  }, [options, placeholder, value]);

  const toggleOption = (selectedValue: string) => {
    const isSelected = value.includes(selectedValue);

    if (isSelected) {
      onValueChange(value.filter((item) => item !== selectedValue));
      return;
    }

    onValueChange([...value, selectedValue]);
  };

  return (
    <div className={className}>
      {name &&
        value.map((selectedValue) => (
          <input
            key={`${name}-${selectedValue}`}
            name={name}
            type="hidden"
            value={selectedValue}
          />
        ))}

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-full justify-between font-normal"
            id={id}
            role="combobox"
            type="button"
            variant="outline"
          >
            <span
              className={cn(
                "truncate",
                value.length === 0 && "text-muted-foreground"
              )}
            >
              {selectedLabel}
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          onInteractOutside={(event) => {
            if (!(event.target instanceof HTMLElement)) {
              return;
            }

            if (event.target.closest(`label[for="${id}"]`)) {
              event.preventDefault();
            }
          }}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isChecked = value.includes(option.value);

                  return (
                    <CommandItem
                      className="gap-2"
                      disabled={option.disabled}
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-sm border border-input",
                          isChecked &&
                            "border-primary bg-primary text-primary-foreground"
                        )}
                      >
                        <Check className="size-3" />
                      </span>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
