def cari_angka(angka : list) -> int :
    sorted_angka = sorted(angka)
    i = 1

    while i <= len(sorted_angka) and sorted_angka[i-1] == sorted_angka[i] - 1 :
        i += 1
    return sorted_angka[i-1] + 1

if __name__ == "__main__" :
    print(cari_angka([3,0,2,4]))
    print(cari_angka([3106,3102,3104,3105,3107]))