using System.Globalization;
using System.Runtime.InteropServices.JavaScript;

public partial class Calculator
{
  public static void Main() {/*dotnet errors on build when this is undefined*/}

  [JSExport]
  internal static string add(string first, string second)
  {
    Decimal firstNumber = Decimal.Parse(first, NumberStyles.Float);
    Decimal secondNumber = Decimal.Parse(second, NumberStyles.Float);

    return (firstNumber + secondNumber).ToString();
  }

  [JSExport]
  internal static string subtract(string first, string second)
  {
    Decimal firstNumber = Decimal.Parse(first, NumberStyles.Float);
    Decimal secondNumber = Decimal.Parse(second, NumberStyles.Float);

    return (firstNumber - secondNumber).ToString();
  }

  [JSExport]
  internal static string multiply(string first, string second)
  {
    Decimal firstNumber = Decimal.Parse(first, NumberStyles.Float);
    Decimal secondNumber = Decimal.Parse(second, NumberStyles.Float);

    return (firstNumber * secondNumber).ToString();
  }

  [JSExport]
  internal static string divide(string first, string second)
  {
    Decimal firstNumber = Decimal.Parse(first, NumberStyles.Float);
    Decimal secondNumber = Decimal.Parse(second, NumberStyles.Float);

    return (firstNumber / secondNumber).ToString();
  }
}
