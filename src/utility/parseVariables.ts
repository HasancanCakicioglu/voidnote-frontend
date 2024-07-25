export const parseVariables = (variables: string[], savedContent: string) => {
    const variablesMap = new Map<string, number[]>();
    const regex = /(\w+)\[(\d+)\]/g;
    let match;
  
    while ((match = regex.exec(savedContent)) !== null) {
      const variable = match[1];
      const value = parseInt(match[2], 10);
  
      if (variables.includes(variable)) {
        if (!variablesMap.has(variable)) {
          variablesMap.set(variable, [value]);
        } else {
          variablesMap.get(variable)?.push(value);
        }
      }
    }
  
    const variablesObject = Array.from(variablesMap.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: number[] });
  
    return variablesObject;
  };