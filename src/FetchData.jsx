  export const fetchData = async () => {
    try {
      const res = await fetch(api_url);
      const data = await res.json();
      setCat(data[0]);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };
    useEffect(() => {
    fetchData();
    console.log("cat", cat);
  }, []);