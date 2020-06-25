// Algorithm
// For 𝑖>0, it holds g^i mod p = (g^i−1 mod p)g mod p,
// which allows to compute the next g^i mod p with a single modular multiplication,
// rather than with a full modular exponentiation

import java.lang.Math;

public class lab6 {
    public static void main(String [] args)
    {
        long m = 0;
        long p = 24852977;
        long g = 2744;
        long y = 8414508;
        long c1 = 15268076;
        long c2 = 743675;
        long x = 0;
        long g_to_the_x_mod_p = 1;

        while(g_to_the_x_mod_p != y) {
            g_to_the_x_mod_p  = (g_to_the_x_mod_p * g) % p;
            x++;
        }
        System.out.println(x); //Alice's Private Key

        long power = p - 1 - x; //FOR [c1^(1-p-x) mod p]

        long z = modPow(c1,power,p); //[c1^(1-p-x) mod p]

        m = ((z * c2) % p); //([c1^(1-p-x) mod p] * c2) % p which gives the decrypted message
        System.out.println(m);
    }

    public static long modPow(long number, long power, long modulus){
        //raises a number to a power with the given modulus
        //when raising a number to a power, the number quickly becomes too large to
        //handle
        //you need to multiply numbers in such a way that the result is consistently
        //moduloed to keep it in the range
        //however you want the algorithm to work quickly - having a multiplication
        //loop would result in an O(n) algorithm!
        //the trick is to use recursion - keep breaking the problem down into smaller
        //pieces and use the modMult method to join them back together
        if(power==0)
            return 1;
        else if (power%2==0) {
            long halfpower=modPow(number, power/2, modulus);
            return modMult(halfpower,halfpower,modulus);
        }else{
            long halfpower=modPow(number, power/2, modulus);
            long firstbit = modMult(halfpower,halfpower,modulus);
            return modMult(firstbit,number,modulus);
        }
    }
    public static long modMult(long first, long second, long modulus){
        //multiplies the first number by the second number with the given modulus
        //a long can have a maximum of 19 digits. Therefore, if you're multiplying
        //two ten digits numbers the usual way, things will go wrong
        //you need to multiply numbers in such a way that the result is consistently
        //moduloed to keep it in the range
        //however you want the algorithm to work quickly - having an addition loop
        //would result in an O(n) algorithm!
        //the trick is to use recursion - keep breaking down the multiplication into
        //smaller pieces and mod each of the pieces individually
        if(second==0)
            return 0;
        else if (second%2==0) {
            long half=modMult(first, second/2, modulus);
            return (half+half)%modulus;
        }else{
            long half=modMult(first, second/2, modulus);
            return (half+half+first)%modulus;
        }
    }
}

