import java.io.*;
import java.util.*;

public class solution {
    public static void main(String args[]) throws Exception {
        long start = System.nanoTime(); //For program runtime

        ArrayList<String> gps = new ArrayList<String>();
        gps = generateArrayListFromFile("EquipmentGPSCo-ordinates.csv");

        String[] coordinates = new String[gps.size()];

        int count = 0;

        //Converts array list to and 1D array of strings
        for (String x : gps) {
            coordinates[count] = x;
            count++;
        }

        double[] xCoordinate = new double[coordinates.length];
        double[] yCoordinate = new double[coordinates.length];


        //Converts to two separeate 1D arrays (x and y co-ordinates)
        for (int i = 0; i < coordinates.length; i++) {
            if (i == 0) {
                String[] str = coordinates[i].substring(1).split(",");
                xCoordinate[i] = Double.parseDouble(str[0]);
                yCoordinate[i] = Double.parseDouble(str[1]);
            } else {
                String[] str = coordinates[i].split(",");
                xCoordinate[i] = Double.parseDouble(str[0]);
                yCoordinate[i] = Double.parseDouble(str[1]);
            }
        }

        //Converts to 2D array
        double[][] gpsCoordinates = new double[1002][2];
        gpsCoordinates[0][0] = xCoordinate[0];
        gpsCoordinates[0][1] = yCoordinate[0];
        for (int i = 1; i < 1001; i++) {
            gpsCoordinates[i][0] = xCoordinate[i];
            gpsCoordinates[i][1] = yCoordinate[i];
        }
        gpsCoordinates[1001][0] = xCoordinate[0];
        gpsCoordinates[1001][1] = yCoordinate[0];


        //Create population object
        Population pop = new Population(gpsCoordinates);

        //Call populatePath function to find solution
        pop.populatePath();

        //For runtime
        long end = System.nanoTime();

        //Print Runtime
        System.out.println("\n\nProgram took " + ((end - start)/1E+9) + " seconds to run");
    }

    //Creates and array list and populates it with gps data in string form
    public static ArrayList<String> generateArrayListFromFile(String filename) throws IOException {

        ArrayList<String> result = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {

            while (br.ready()) {
                result.add(br.readLine());
            }
            return result;
        }

    }

}