public class Population {
    public double [][] originalPop;
    public double [][] path = new double[1002][2];
    public int [] solutionString = new int[1002];
    public boolean [] indexCheck = new boolean[1002];

    //Initialize arrays
    public Population(double [][] gpsCoordinates) {
        originalPop = gpsCoordinates;   //Copy global array
        for(int i = 0; i<1002; i++) {
            solutionString[i] = i;      //Solution string with default gps indexes
        }
        path[0][0] = originalPop[0][0]; //Set point 0 to orignal array point 0
        path[0][1] = originalPop[0][1];
        for(int i = 0; i<1002; i++) {
            indexCheck[i] = false;      //Set all indexes visited to false
        }
    }

    //Calculates total distance between all the points
    public double calculateDistance(double [][] ar) {

        double sum = 0;
        for(int i = 0; i <1001; i++) {
            double result = 0;
            if(i != 1001) {
                result = distanceCalculator(ar[i][0], ar[i][1], ar[i + 1][0], ar[i + 1][1]);
            }

            sum += result;

        }
        return sum;

    }

    //Haversine formula
    public double distanceCalculator(double location1Lat, double location1Long, double location2Lat, double location2Long) {
        int earthRadius = 6371; //Km

        double LatitudeDifference = toRadians(location2Lat - location1Lat);
        double LongitudeDifference = toRadians(location2Long - location1Long);

        location1Lat = toRadians(location1Lat);
        location2Lat = toRadians(location2Lat);

        double haverSinea = Math.sin(LatitudeDifference/2) * Math.sin(LatitudeDifference/2) + Math.sin(LongitudeDifference/2) * Math.sin(LongitudeDifference/2)
                * Math.cos(location1Lat) * Math.cos(location2Lat);

        double haverSinec = 2 * Math.atan2(Math.sqrt(haverSinea), Math.sqrt(1-haverSinea));

        return earthRadius * haverSinec;
    }

    //Convert double to radians
    public double toRadians(double coordinates) {
        return coordinates * Math.PI / 180;
    }

    //Sets the solution apth
    public void populatePath() {
        path[0][0] = originalPop[0][0];
        path[0][1] = originalPop[0][1];
        indexCheck[0] = true;
        indexCheck[indexCheck.length - 1] = true;

        /*
        Algorithm:
        1.	Set all points as unvisited.
        2.	Set the starting point as point 0 and the ending point as the same location as point 0.
        3.	Mark point 0 as visited.
        4.	Find all the distances between the current point and the rest of the points.
        5.	If the distance is greater than 200 (instead of 100 due to errors) and less than the best distance so far,
            assign that distance as the “best” and it’s index as the “bestIndex”.
        6.	Once all distances have been calculated, whatever the best value is,
            we assign the index of the value to the next point in the path.
        7.	Repeat from step 4 until the path is completed.
        8.	If path is completed, then terminate the program (Swap 5 random elements (deterministic outcome).

         */
        for(int currentIndex = 0; currentIndex < 1001; currentIndex++) {
            double best = 1000000;
            int bestIndex = 0;
            for (int i = 1; i < 1001; i++) {
                double distance = distanceCalculator(path[currentIndex][0], path[currentIndex][1], originalPop[i][0], originalPop[i][1]);
                if (distance < best && distance > 200 && indexCheck[i] == false) {
                    best = distance;
                    bestIndex = i;
                }

            }
            path[currentIndex + 1][0] = originalPop[bestIndex][0];
            path[currentIndex + 1][1] = originalPop[bestIndex][1];
            indexCheck[bestIndex] = true;
            solutionString[currentIndex] = bestIndex;
        }

        path[path.length - 1][0] = originalPop[path.length - 1][0];
        path[path.length - 1][1] = originalPop[path.length - 1][1];

        //Random point swap because of deterministic solution
        swap(693, 575);
        swap(503, 796);
        swap(632, 524);
        swap(324, 890);
        swap(765,777);

        double solution = calculateDistance(path);
        System.out.println("Distance = " + solution + " KM");
        System.out.println("Time = " + (solution/800 + 501) + " HOURS");    //501 is used to allow for 30 minute stop at each location

        System.out.println("\nSolution String:");

        //Sets solution string
        System.out.print("0,");
        for(int i = 0; i<indexCheck.length - 1; i++) {
            System.out.print(solutionString[i]);
            if(i != indexCheck.length - 1) {
                System.out.print(",");
            }
        }


    }

    //Swaps two given indexes
    public void swap(int index1, int index2) {
        double a = path[index1][0];
        double b = path[index1][1];
        int c = solutionString[index1];
        path[index1][0] = path[index2][0];
        path[index1][1] = path[index2][1];
        solutionString[index1] = solutionString[index2];
        path[index2][0] = a;
        path[index2][1] = b;
        solutionString[index2] = c;
    }



}
