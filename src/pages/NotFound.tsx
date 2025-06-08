
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              {/* Large 404 Text */}
              <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
                404
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Page Not Found
              </h1>
              <p className="text-lg text-gray-600">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">What you can do:</h2>
              <ul className="text-sm text-blue-700 text-left space-y-1">
                <li>• Check the URL for any typos</li>
                <li>• Go back to the previous page</li>
                <li>• Visit our homepage</li>
                <li>• Search for turfs in your area</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 btn-primary"
                onClick={() => navigate("/")}
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline"
                onClick={() => navigate("/turfs")}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Turfs
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Still having trouble? Contact us at{" "}
                <a href="mailto:support@turffinder.com" className="text-primary hover:underline">
                  support@turffinder.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
