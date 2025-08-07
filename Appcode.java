import java.util.Scanner;
public class Appcode {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Code for the app goes here
        System.out.println("Welcome to the Planting App!");
        System.out.print("Enter the type of plant you want to grow: ");
        String plantType = scanner.nextLine();
        System.out.println("You have chosen to grow: " + plantType);
        System.out.println("Enter the garden size (Length in meters)");
        Float length = scanner.nextFloat();
        System.out.println("Enter the garden width (Width in meters)");
        Float width = scanner.nextFloat();
        System.out.println("Thank you! here is everything you need to know about growing " + plantType + " in a garden of size " + length + "m x " + width + "m.");
        infoOnPlant(plantType, width, width);
        scanner.close();
    }
    static void infoOnPlant(String plantType, float length, float width ) {
        if (plantType.equalsIgnoreCase("tomatoes")){
            System.out.println("Tomatoes are a warm-season crop that thrive in full sun. They require well-drained soil and regular watering.");
            System.out.println("Plant them after the last frost, spacing them about 18-24 inches apart.");
            System.out.println("Fertilize with a balanced fertilizer every 4-6 weeks during the growing season.");
            float spacingWidth = 0.40f;
            float spacingLength = 0.60f;
            float area = length * width; // area in square meters
            float numberOfPlants = area / (spacingWidth * spacingLength);
            System.out.println("You can plant approximately " + (int)numberOfPlants + " tomato plants in your garden.");
            System.out.println("You should maintain a distance of " + spacingWidth + "cm between each plant in the row and " + spacingLength + "cm between rows.");
        }
        else if(plantType.equalsIgnoreCase("potatoes")) {


        }

        }
    }
