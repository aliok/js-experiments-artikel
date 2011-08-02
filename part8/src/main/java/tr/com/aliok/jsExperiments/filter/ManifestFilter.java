package tr.com.aliok.jsExperiments.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * @author Ali Ok (aliok@apache.org)
 */
public class ManifestFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //manifest files need to be served with this mime type, else browser complains about it
        servletResponse.setContentType("text/cache-manifest");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }
}