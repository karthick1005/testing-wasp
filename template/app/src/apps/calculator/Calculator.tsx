import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            🧮 <span className='text-primary'>Simple</span> Calculator
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground'>
            A basic calculator for your everyday calculations
          </p>
        </div>

        <div className='mt-12 max-w-md mx-auto'>
          <Card className='bg-background border-2'>
            <CardHeader>
              <CardTitle className='text-center'>Calculator</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Display */}
              <div className='bg-muted p-4 rounded-lg text-right'>
                <div className='text-2xl font-mono font-bold min-h-[2rem] flex items-center justify-end'>
                  {display}
                </div>
              </div>

              {/* Buttons */}
              <div className='grid grid-cols-4 gap-2'>
                {/* Row 1 */}
                <Button variant='outline' onClick={clear} className='col-span-2'>
                  Clear
                </Button>
                <Button variant='outline' onClick={clearEntry}>
                  CE
                </Button>
                <Button variant='outline' onClick={() => inputOperation('÷')}>
                  ÷
                </Button>

                {/* Row 2 */}
                <Button variant='outline' onClick={() => inputNumber('7')}>
                  7
                </Button>
                <Button variant='outline' onClick={() => inputNumber('8')}>
                  8
                </Button>
                <Button variant='outline' onClick={() => inputNumber('9')}>
                  9
                </Button>
                <Button variant='outline' onClick={() => inputOperation('×')}>
                  ×
                </Button>

                {/* Row 3 */}
                <Button variant='outline' onClick={() => inputNumber('4')}>
                  4
                </Button>
                <Button variant='outline' onClick={() => inputNumber('5')}>
                  5
                </Button>
                <Button variant='outline' onClick={() => inputNumber('6')}>
                  6
                </Button>
                <Button variant='outline' onClick={() => inputOperation('-')}>
                  -
                </Button>

                {/* Row 4 */}
                <Button variant='outline' onClick={() => inputNumber('1')}>
                  1
                </Button>
                <Button variant='outline' onClick={() => inputNumber('2')}>
                  2
                </Button>
                <Button variant='outline' onClick={() => inputNumber('3')}>
                  3
                </Button>
                <Button variant='outline' onClick={() => inputOperation('+')} className='row-span-2'>
                  +
                </Button>

                {/* Row 5 */}
                <Button variant='outline' onClick={() => inputNumber('0')} className='col-span-2'>
                  0
                </Button>
                <Button variant='outline' onClick={inputDecimal}>
                  .
                </Button>

                {/* Equals button */}
                <Button variant='default' onClick={performCalculation} className='col-span-3 bg-primary'>
                  =
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
