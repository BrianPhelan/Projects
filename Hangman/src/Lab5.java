import java.util.Scanner;
import java.io.*;
import java.lang.Math;
public class Lab5 {
    public static void main(String [] args) {
        String [] hang = new String[9];
        hang[0] = "__________\n" +
                "|\t\t   \n" +
                "|\t\t   \n" +
                "|\t\t     \n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[1] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   \n" +
                "|\t\t     \n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[2] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t     \n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[3] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t   | \n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[4] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t / | \n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[5] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t / | \\\n" +
                "|\t\t   \n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[6] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t / | \\\n" +
                "|\t\t   |\n" +
                "|\t\t  \n" +
                "|\t\t   \n" +
                "|";
        hang[7] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   0\n" +
                "|\t\t / | \\\n" +
                "|\t\t   |\n" +
                "|\t\t  / \n" +
                "|\t\t   \n" +
                "|";
        hang[8] = "__________\n" +
                "|\t\t   |\n" +
                "|\t\t   o\n" +
                "|\t\t / | \\\n" +
                "|\t\t   |\n" +
                "|\t\t  / \\\n" +
                "|\t\t   \n" +
                "|";
        System.out.println(hang[0]);

        Scanner scan = new Scanner(System.in);

        FileIO reader = new FileIO();
        String[] contents = reader.load("dictionary.txt");
        String secretWord = contents[(int)Math.floor(Math.random() * Math.floor(contents.length))];
        char[] ar = secretWord.toCharArray();
        String dash = secretWord.replaceAll(".", "_");
        char [] dashes = dash.toCharArray();

        char guessletter = ' ';
        int guessCount = 0;
        int guessLimit = 8;
        boolean correct = false;
        boolean win = false;

        System.out.println("Your word is " + secretWord.length() + " letters long");

        for (int j = 0; j < dashes.length; j++) {
            System.out.print(dashes[j] + " ");
        }

        while(guessCount<guessLimit) {
            guessletter = scan.next().charAt(0);
            for (int i = 0; i < ar.length; i++) {
                if (ar[i] == guessletter) {
                    dashes[i] = guessletter;
                    correct = true;
                }
            }
            if(correct == false) {
                guessCount++;
                System.out.println(hang[guessCount]);
            }
            for (int j = 0; j < dashes.length; j++) {
                System.out.print(dashes[j] + " ");
            }
            correct = false;

        }

        int count = 0;
        for(int i = 0; i < ar.length; i++)
        {
            if(ar[i] == dashes[i])
            {
                count++;
            }
        }
        if(count == ar.length)
        {
            win = true;
        }
        if(win == false){
            System.out.println("You Lose!");
            System.out.println(secretWord);
        } else {
            System.out.println("You Win!");
        }


    }
}

class FileIO{

    public String[] load(String file) {
        File aFile = new File(file);
        StringBuffer contents = new StringBuffer();
        BufferedReader input = null;
        try {
            input = new BufferedReader( new FileReader(aFile) );
            String line = null;
            int i = 0;
            while (( line = input.readLine()) != null){
                contents.append(line);
                i++;
                contents.append(System.getProperty("line.separator"));
            }
        }
        catch (FileNotFoundException ex) {
            System.out.println("Can't find the file - are you sure the file is in this location: "+file);
            ex.printStackTrace();
        }
        catch (IOException ex){
            System.out.println("Input output exception while processing file");
            ex.printStackTrace();
        }
        finally {
            try {
                if (input!= null) {
                    input.close();
                }
            }
            catch (IOException ex) {
                System.out.println("Input output exception while processing file");
                ex.printStackTrace();
            }
        }
        String[] array = contents.toString().split("\n");
        for(String s: array){
            s.trim();
        }
        return array;
    }


    public void save(String file, String[] array) throws FileNotFoundException, IOException {

        File aFile = new File(file);
        Writer output = null;
        try {
            output = new BufferedWriter( new FileWriter(aFile) );
            for(int i=0;i<array.length;i++){
                output.write( array[i] );
                output.write(System.getProperty("line.separator"));
            }
        }
        finally {
            if (output != null) output.close();
        }
    }
}