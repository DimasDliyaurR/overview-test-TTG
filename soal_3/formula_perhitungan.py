import math

def isAllSum(source: list[int], target: int) -> bool:
    return sum(source) == target

def isAllMultiple(source: list[int], target: int) -> bool:
    return math.prod(source) == target

def isAllMinus(source, target):
    result = source[0] # Fix: start from first number
    for i in range(1, len(source)):
        result -= source[i]
    return result == target

def evaluation(A, op, B):
    match op:
        case "+": return A + B
        case "*": return A * B
        case "-": return A - B
    return 0

def produce_arithmatic(source, key, operator):
    if key != "number":
        num1 = str(source[0])
        num2 = str(source[1])
        return f"({num1} {operator[key]} {num2})"
    else:
        return str(source)

def formula_perhitungan(source: list[int], target: int) -> str:
    
    operator = {"plus": "+", "minus": "-", "multiple": "*"}
    
    combination_dict = {
        "number": {},
        "multiple": {},
        "minus": {},
        "plus": {},
    }

    if isAllSum(source, target):
        return " + ".join(map(lambda x : f" {str(x)} ", source))
    elif isAllMultiple(source, target):
        return " * ".join(map(lambda x : f" {str(x)} ", source))
    elif isAllMinus(source, target):
        return " - ".join(map(lambda x : f" {str(x)} ", source))
    
    # --- Generate Combination ---
    for i in range(len(source)):
        combination_dict["number"][source[i]] = source[i]
        for j in range(len(source)):
            if i != j: 
                if i < j:
                    multiple = source[i] * source[j]
                    plus = source[i] + source[j]
                    combination_dict["multiple"][multiple] = [source[i], source[j]]
                    combination_dict["plus"][plus] = [source[i], source[j]]
                
                if source[i] != source[j]: 
                    minus = source[i] - source[j]
                    combination_dict["minus"][minus] = [source[i], source[j]]

    
    for key_A in combination_dict:
        for A, value_A in combination_dict[key_A].items():
            
            number_vest_A_combination = []
            str_A = ""
            
            if key_A == "number":
                number_vest_A_combination.append(A)
                str_A = str(A)
            else:
                number_vest_A_combination.append(value_A[0])
                number_vest_A_combination.append(value_A[1])

                str_A = produce_arithmatic(value_A, key_A, operator)

            for key_B in combination_dict:
                for B, value_B in combination_dict[key_B].items():
                    
                    is_conflict = False
                    number_vest_B_combination = []
                    
                    if key_B == "number":
                        number_vest_B_combination.append(B)
                    else:
                        number_vest_B_combination.append(value_B[0])
                        number_vest_B_combination.append(value_B[1])

                    for num in number_vest_B_combination:
                        if num in number_vest_A_combination:
                            is_conflict = True
                            break
                    
                    if is_conflict:
                        continue
                    
                    if len(number_vest_A_combination) + len(number_vest_B_combination) != len(source):
                        continue

                    str_B = ""
                    if key_B == "number":
                        str_B = str(B)
                    else:
                        str_B = produce_arithmatic(value_B, key_B, operator)

                    for op_name, op_symbol in operator.items():
                        result = evaluation(A, op_symbol, B)
                        
                        if result == target:
                            return f"{str_A} {op_symbol} {str_B} = {target}"

    return "Tidak Ditemukan"

if __name__ == "__main__" :
    for i in [16,18,50] :
        print(formula_perhitungan([1,4,5,6],i))
    