package ca;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args)
    {
	    String f = "test.bin";//change file name name to name you want game for game with .bin extension
        try
        {
          FileOutputStream fileOS = new FileOutputStream(f);
          String s =
                  "D335" +
                          "6106" +
                          "a006" +
                          "D135";
          fileOS.write(hexStringToByteArray(s));
        }
        catch(FileNotFoundException e)
        {
            e.printStackTrace();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        System.out.println("done");
    }

    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }
}
