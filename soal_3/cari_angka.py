def cari_angka(angka : list) -> int|list[int] :
    sorted_angka = sorted(angka)
    i = 1
    result = []

    for i in range(1,len(sorted_angka)) :
        if sorted_angka[i-1] != sorted_angka[i] - 1 :
            for j in [i for i in range(sorted_angka[i-1] + 1,sorted_angka[i])] :
                result.append(j)
    return result[0] if len(result) == 1 else result

if __name__ == "__main__" :
    print(cari_angka([3,0,2,4]))
    print(cari_angka([3106,3102,3104,3105,3107]))
    print(cari_angka([3112,3120,3101,3105,3107]))