import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerWithLabelProps {
    fieldTittle: string;
    nameInSchema: string;
    className?: string;
}

// Función para convertir Date a formato DD/MM/YYYY
function formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Función para convertir DD/MM/YYYY a Date
function parseDDMMYYYYToDate(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Los meses en JavaScript son 0-indexados
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    return new Date(year, month, day);
}

// Componente de calendario simple
function SimpleCalendar({ 
    selectedDate, 
    onDateSelect 
}: { 
    selectedDate?: Date | null; 
    onDateSelect: (date: Date) => void;
}) {
    const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
    
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"];
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < firstDayWeek; i++) {
        days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }
    
    const isSelectedDay = (day: number | null) => {
        if (!day || !selectedDate) return false;
        return selectedDate.getDate() === day && 
               selectedDate.getMonth() === month && 
               selectedDate.getFullYear() === year;
    };
    
    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };
    
    const goToNextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };
    
    return (
        <div className="w-64 p-3 bg-gray-800 text-white rounded-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousMonth}
                    className="text-white hover:bg-gray-700"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <h3 className="text-white font-medium">
                    {monthNames[month]} {year}
                </h3>
                
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={goToNextMonth}
                    className="text-white hover:bg-gray-700"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-xs text-gray-400 py-1">
                        {day}
                    </div>
                ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <Button
                        key={index}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-8 w-8 p-0 text-sm",
                            day === null ? "invisible" : "",
                            isSelectedDay(day) 
                                ? "bg-blue-600 text-white hover:bg-blue-700" 
                                : "text-white hover:bg-gray-700"
                        )}
                        onClick={() => {
                            if (day !== null) {
                                onDateSelect(new Date(year, month, day));
                            }
                        }}
                        disabled={day === null}
                    >
                        {day}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export function DatePickerWithLabel({
    fieldTittle,
    nameInSchema,
    className
}: DatePickerWithLabelProps) {
    const form = useFormContext();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Cerrar calendario cuando se hace clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        }

        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen]);

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className={cn("space-y-2 relative", className)}>
                    <FormLabel>{fieldTittle}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="DD/MM/YYYY"
                                className="text-black placeholder-gray-400 pr-10"
                                value={field.value ? 
                                    (field.value instanceof Date ? 
                                        formatDateToDDMMYYYY(field.value) :
                                        field.value
                                    ) : ''
                                }
                                onClick={() => setIsCalendarOpen(true)}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    
                                    // Permitir solo números y barras
                                    const cleanValue = inputValue.replace(/[^\d/]/g, '');
                                    
                                    // Formatear automáticamente mientras escribes
                                    let formattedValue = cleanValue;
                                    if (cleanValue.length >= 2 && !cleanValue.includes('/')) {
                                        formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2);
                                    }
                                    if (cleanValue.length >= 5 && cleanValue.split('/').length === 2) {
                                        const parts = cleanValue.split('/');
                                        formattedValue = parts[0] + '/' + parts[1].slice(0, 2) + '/' + parts[1].slice(2);
                                    }
                                    
                                    // Limitar a 10 caracteres (DD/MM/YYYY)
                                    if (formattedValue.length > 10) {
                                        formattedValue = formattedValue.slice(0, 10);
                                    }
                                    
                                    // Actualizar el campo con el valor formateado
                                    const dateValue = parseDDMMYYYYToDate(formattedValue);
                                    
                                    // Si es una fecha válida completa, guardar como Date, sino como string
                                    if (formattedValue.length === 10 && dateValue) {
                                        field.onChange(dateValue);
                                    } else {
                                        // Mantener el string formateado mientras se escribe
                                        field.onChange(formattedValue);
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-0 h-full px-3 py-2 hover:bg-transparent text-white hover:text-white"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            >
                                <CalendarIcon className="h-4 w-4 text-white" />
                            </Button>
                            
                            {/* Calendar Dropdown */}
                            {isCalendarOpen && (
                                <div 
                                    ref={calendarRef}
                                    className="absolute top-full left-0 z-50 mt-1 rounded-md shadow-lg"
                                >
                                    <SimpleCalendar
                                        selectedDate={field.value instanceof Date ? field.value : null}
                                        onDateSelect={(date) => {
                                            field.onChange(date);
                                            setIsCalendarOpen(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}